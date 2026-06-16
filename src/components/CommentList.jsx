const CommentList = ({ comments, formatDate }) => {
  return (
    <div className="bg-gray-900 border border-white/10 shadow-sm rounded-xl p-6 mb-6">
      <h3 className="text-sm font-semibold text-white mb-4">Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p className="text-sm text-gray-400">No comments yet.</p>
      ) : (
        <div className="flex flex-col divide-y divide-white/5">
          {comments.map((c) => (
            <div key={c.id} className="py-3">
              <p className="text-sm text-gray-300">{c.body}</p>
              <p className="text-xs text-gray-400 mt-1">{formatDate(c.created_at)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
