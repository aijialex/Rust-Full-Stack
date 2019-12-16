pub fn reference<SD>(
    data: web::Data<ServerData>,
    path: web::Path<(String,)>,
    req: HttpRequest,
) -> impl Future<Item = HttpResponse, Error = HtmlError>
where
    SD: SwordDrillable,
{
    let db = data.db.to_owned();
    let raw_reference = path.0.replace("/", ".");
    match raw_reference.parse::<Reference>() {
        Ok(reference) => {
            let data_reference = reference.to_owned();
            Either::A(
                web::block(move || SD::verses(&reference, &VerseFormat::HTML, &db.get().unwrap()))
                    .map_err(HtmlError::from)
                    .and_then(move |result| {
                        let verses_data = VersesData::new(result, data_reference, &req);

                        if verses_data.verses.is_empty() {
                            return Err(Error::InvalidReference {
                                reference: raw_reference,
                            }
                            .into());
                        }

                        let body = TemplateData::new(
                            &verses_data,
                            Meta::for_reference(
                                &verses_data.reference,
                                &verses_data.verses,
                                &verses_data.links,
                            ),
                        )
                        .to_html("chapter", &data.template)?;
                        Ok(HttpResponse::Ok().content_type("text/html").body(body))
                    }),
            )
        }
        Err(_) => Either::B(err(HtmlError(Error::InvalidReference {
            reference: raw_reference,
        }))),
    }
}

