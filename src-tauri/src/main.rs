#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;

mod commands;
mod utils;

#[derive(Clone, serde::Serialize, serde::Deserialize)]
struct ResizeWindowPayload {
    width: f64,
    height: f64,
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle =  app.handle();
            app.listen_global("ResizeWindow",  move|event| {
                let payload : ResizeWindowPayload = serde_json::from_str(event.payload().unwrap()).unwrap();
                utils::resize_window(  handle.clone(), payload.width as f64, payload.height as f64);
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::read_file,
            commands::open_overlay,
            commands::resize_overlay
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
