import Emoji from "emoji-store"
let e = new Emoji({
    author: 'apple',
    size: 160,
    type: 'png'
})

type EmojiType = {
    emoji: string,
    type?: 'apple' | 'facebook'
}

export default function TextEmoji({ emoji, type }: EmojiType) {
    let em = e
    if (type == 'facebook')
        em = new Emoji({
            author: 'facebook',
            size: 96,
            type: 'png'
        })
    return <img src={em.get(emoji)} alt="" className="inline-block h-[1.3em] align-middle" />
}