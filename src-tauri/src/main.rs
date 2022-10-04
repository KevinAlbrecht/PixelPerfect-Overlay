#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn navigate(folderName: &str) ->vec![]   {
//     let paths = fs::read_dir("./").unwrap();
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

// #[tauri::command]
// fn get_b64_from_uint8(binary: &[u8]) -> String {
//     base64::encode(binary).into()
// }

// #[tauri::command]
// fn read_file(path: String) -> String {
//     match std::fs::read(path) {
//         Ok(bytes) => base64::encode(bytes).into(),
//         Err(e) => {
//             if e.kind() == std::io::ErrorKind::PermissionDenied {
//                 eprintln!("please run again with appropriate permissions.");
//             }
//             panic!("{}", e);
//         }
//     }
// }

mod commands;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![commands::read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
