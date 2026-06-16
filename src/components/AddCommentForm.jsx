import { LuLoader } from "react-icons/lu";

const AddCommentForm = ({ commentText, setCommentText, onSubmit, loading }) => {
  return (
    <div className="bg-gray-900 border border-white/10 shadow-sm rounded-xl p-6">
      <h3 className="text-sm font-semibold text-white mb-3">Add Comment</h3>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment here"
          rows={4}
          required
          className="w-full border border-white/10 rounded px-3 py-2 text-sm bg-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-gray-500 resize-none"
        />
        <button
          type="submit"
          disabled={loading || !commentText.trim()}
          className="self-end bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white font-medium px-6 py-2 rounded text-sm cursor-pointer transition-colors flex items-center gap-2"
        >
          {loading ? <><LuLoader className="animate-spin" /> Posting…</> : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
