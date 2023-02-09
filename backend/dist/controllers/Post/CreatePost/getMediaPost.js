"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMediaPost = (files) => {
    const media = [];
    for (const file of files) {
        media.push({
            source: file.path.slice(6, file.path.length),
            title: file.filename,
        });
    }
    return media;
};
exports.default = getMediaPost;
