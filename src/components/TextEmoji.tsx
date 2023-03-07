import Emoji from "emoji-store"
let e = new Emoji({
    author: 'apple',
    size: 160,
    type: 'png'
})

export default function TextEmoji({ emoji }: any) {
    return <img src={e.get(emoji)} alt="" className="inline-block h-[1.3em] align-middle" />
}