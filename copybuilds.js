const fs = require('fs');
const targets = [
    { build: "target/aarch64-unknown-linux-gnu/release/libnode_systemstat.so", prebuildDir: "prebuilds/linux-arm64", module: "node.napi.node" },
    { build: "target/aarch64-unknown-linux-musl/release/libnode_systemstat.so", prebuildDir: "prebuilds/linux-arm64", module: "node.napi.musl.node" },
    { build: "target/armv7-unknown-linux-gnueabi/release/libnode_systemstat.so", prebuildDir: "prebuilds/linux-armv7l", module: "node.napi.node" },
    { build: "target/armv7-unknown-linux-musleabi/release/libnode_systemstat.so", prebuildDir: "prebuilds/linux-armv7l", module: "node.napi.musl.node" },
    { build: "target/i686-unknown-linux-gnu/release/libnode_systemstat.so", prebuildDir: "prebuilds/linux-x86", module: "node.napi.node" },
    { build: "target/i686-unknown-linux-musl/release/libnode_systemstat.so", prebuildDir: "prebuilds/linux-x86", module: "node.napi.musl.node" },
    { build: "target/x86_64-unknown-linux-gnu/release/libnode_systemstat.so", prebuildDir: "prebuilds/linux-x64", module: "node.napi.node" },
    { build: "target/x86_64-unknown-linux-musl/release/libnode_systemstat.so", prebuildDir: "prebuilds/linux-x64", module: "node.napi.musl.node" },
    { build: "target/i686-pc-windows-gnu/release/node_systemstat.dll", prebuildDir: "prebuilds/win-x86", module: "node.napi.node" },
    { build: "target/x86_64-pc-windows-gnu/release/node_systemstat.dll", prebuildDir: "prebuilds/win-x64", module: "node.napi.node" },
    { build: "target/powerpc64-unknown-linux-gnu/release/libnode_systemstat.so", prebuildDir: "prebuilds/linux-ppc64", module: "node.napi.node" },
    { build: "target/powerpc64le-unknown-linux-gnu/release/libnode_systemstat.so", prebuildDir: "prebuilds/linux-ppc64le", module: "node.napi.node" },
    { build: "target/s390x-unknown-linux-gnu/release/libnode_systemstat.so", prebuildDir: "prebuilds/linux-s390x", module: "node.napi.node" },
    { build: "target/riscv64gc-unknown-linux-gnu/release/libnode_systemstat.so", prebuildDir: "prebuilds/linux-riskv64", module: "node.napi.node" },
    { build: "target/aarch64-apple-darwin/release/libnode_systemstat.so", prebuildDir: "prebuilds/darwin-arm64", module: "node.napi.node" },
    { build: "target/x86_64-apple-darwin/release/libnode_systemstat.so", prebuildDir: "prebuilds/darwin-x64", module: "node.napi.node" },
    // skip until aix support for std arrives in rust
    // { build: "target/powerpc64-ibm-aix/release/libnode_systemstat.dll", prebuildDir: "prebuilds/win-x64", module: "node.napi.node" },
]

function copyToPrebuild(item) {
    fs.mkdirSync(item.prebuildDir, { recursive: true })

    const filePath = `${item.prebuildDir}/${item.module}`;
    // File destination.txt will be created or overwritten by default.
    fs.copyFile(item.build, filePath, (err) => {
        if (err) throw err;
        console.log(`${item.build} was copied to ${filePath}`);
    });
}

targets.forEach(copyToPrebuild);
