# PixelPerfect-Overlay

Let you open assets in a transparent window for design integration.

### Preview
![overlay](https://user-images.githubusercontent.com/3635730/198086995-a70943f8-34ff-4ab9-9607-fd7212a64781.gif)

### Motivations
Having a "zeplin popout" like tool, rust curiosity

### Install
Made widh [Tauri](https://tauri.app/), no release yet so you will need to [build by yourself](https://tauri.app/v1/guides/getting-started/prerequisites)

Actually working on Windows & macOs

### Done
- [x] Browse directories
- [x] Support "binary" img files (pnj jpeg...)
- [x] Support unique file from clipboard
- [x] Zoom feature


### TODO
- [ ] Add keyboards events to move the window precisely (draft PR [#17](https://github.com/KevinAlbrecht/PixelPerfect-Overlay/pull/17))
- [ ] Support SVG files
- [ ] Support drag n drop
- [ ] Custom value for zoom mode

### Issues

#### [Windows] (none indeed)
-
#### [macOs] 😑
- UI engine seems to struggle when redrawing with transparency, a dark shadow will appear, which is really annoying. Anyway, the fun part is zeplin popout have the same bug 


