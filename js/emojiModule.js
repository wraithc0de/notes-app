class EmojiModule {
    constructor(quill, options) {
        quill.on(Quill.events.TEXT_CHANGE, () => {
            console.log(1);
        });
    }
}