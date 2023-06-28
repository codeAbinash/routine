import Emoji from "emoji-store"
import { parseEmoji } from "../lib/lib"
let e_apple = new Emoji({
    author: 'apple',
    size: 160,
    type: 'png'
})

let e_facebook = new Emoji({
    author: 'facebook',
    size: 96,
    type: 'png'
})


type EmojiType = {
    emoji: string,
    type?: 'apple' | 'facebook'
}

export default function TextEmoji({ emoji, type }: EmojiType) {
    let em = e_apple
    emoji = parseEmoji(emoji)[0]
    if (type == 'facebook')
        em = e_facebook
    return <img src={em.get(emoji)} alt={emoji} loading="lazy" className="inline-block h-[1.3em] align-middle" />
}