extern crate tokio;

use tokio::time::{self, Duration};

#[tokio::main]
async fn main() {
    let mut interval = time::interval(Duration::from_millis(1000));

    while let Some(_) = interval.tick().await {
        println!("prints every four seconds");
    }
}
