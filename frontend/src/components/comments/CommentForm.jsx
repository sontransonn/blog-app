import React from 'react'

const CommentForm = () => {
    return (
        <form>
            <div className="flex flex-col items-end border border-primary rounded-lg p-4">
                <textarea
                    className="w-full focus:outline-none bg-transparent"
                    rows="5"
                    placeholder="Leave your comment here..."
                />

                <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
                    <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-primary
         text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        submit
                    </button>
                </div>
            </div>
        </form>
    )
}

export default CommentForm