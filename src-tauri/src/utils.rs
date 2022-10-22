extern crate base64;

pub fn get_b64_from_uint8(buffer: Vec<u8>) -> String {
    return base64::encode(buffer);
}

pub fn create_window(handle: tauri::AppHandle) {
    let local_window = tauri::WindowBuilder::new(
        &handle,
        "overlay",
        tauri::WindowUrl::App("overlay.html".into()),
    ).build().unwrap();
 
    // let docs_window = tauri::WindowBuilder::new(
    //     &handle,
    //     "overlay",
    //     tauri::WindowUrl::App("overlay.html".into()),
    // )
    // .build()
    // .unwrap();

    // let app = tauri::Builder::default()
    //     .build(tauri::generate_context!())z
    //     .expect("error while building tauri application");

    // let docs_window = tauri::WindowBuilder::new(
    //     &app,
    //     "external", /* the unique window label */
    //     tauri::WindowUrl::External("https://tauri.app/".parse().unwrap()),
    // )
    // .build()
    // .expect("failed to build window");

    // let local_window =
    //     tauri::WindowBuilder::new(&app, "local", tauri::WindowUrl::App("overlay.html".into()));

    //    let lol =  local_window.build();
}

// tauri::Builder::default().setup(|app| {
//     tauri::WindowBuilder::new(app, "overlay", tauri::WindowUrl::App("overlay.html".into()))
//         .build()?;
//     Ok(())
//     // Err(error) => {
//     //     panic!("error",error)
//     // };
// });

// tauri::Builder::default().setup(|app| {
//     let overlay_window = tauri::WindowBuilder::new(
//         app,
//         "overlay", /* the unique window label */
//         tauri::WindowUrl::App("overlay.html".parse().unwrap()),
//     )
//     .build()?;
//     let local_window =
//         tauri::WindowBuilder::new(app, "local", tauri::WindowUrl::App("index.html".into()))
//             .build()?;
//     Ok(())
// })
