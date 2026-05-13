import { Link } from "react-router-dom";

const formatDate = (value) => (value ? new Date(value).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "-");

const AdminEventTable = ({ events, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-md">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Title</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Date</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Location</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Available Seats</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">Price</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {events.map((event) => (
            <tr key={event.id}>
              <td className="px-4 py-3 text-sm font-medium text-slate-900">{event.title}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{formatDate(event.date)}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{event.location}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{event.available_seats}</td>
              <td className="px-4 py-3 text-sm text-slate-600">₹{Number(event.price || 0).toFixed(2)}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    to={`/admin/edit-event/${event.id}`}
                    className="rounded-md bg-indigo-100 px-3 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="rounded-md bg-red-100 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEventTable;
