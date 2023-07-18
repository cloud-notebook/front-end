import { useEffect, useState } from "react";
import { useStaticsQuery } from "../../../services/dashboard.service";


export default function Dashboard() {

    const [dashboardData, setDashboardData] = useState({});
    const [recentNotes, setRecentNotes] = useState([]);

    const { data, isLoading, isError, error, isSuccess } = useStaticsQuery();

    useEffect(() => {
        if (isSuccess) {
            setDashboardData(data);
            setRecentNotes(data.recentNotes);
        }
    }, [data])


    return (
        <div className="flex flex-col items-center mt-10 bg-white dark:bg-gray-800 text-black dark:text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="rounded-lg shadow-md p-6">
                    <div className="text-gray-600 dark:text-white  font-semibold text-lg mb-2">Total Notes</div>
                    <div className="text-3xl font-bold">{dashboardData?.totalNotes}</div>
                </div>
                <div className="rounded-lg shadow-md p-6">
                    <div className="text-gray-600 dark:text-white font-semibold text-lg mb-2">Public Notes</div>
                    <div className="text-3xl font-bold">{dashboardData?.publicNotes}</div>
                </div>
                <div className="rounded-lg shadow-md p-6">
                    <div className="text-gray-600 dark:text-white  font-semibold text-lg mb-2">Private Notes</div>
                    <div className="text-3xl font-bold">{dashboardData?.privateNotes}</div>
                </div>
                <div className="rounded-lg shadow-md p-6">
                    <div className="text-gray-600 dark:text-white  font-semibold text-lg mb-2">Review on Public Notes</div>
                    <div className="text-3xl font-bold">{dashboardData?.reviewOnPublicNotes}</div>
                </div>
            </div>
            <div className="mt-8 w-[70%] mx-auto">
                <h2 className="text-xl font-semibold mb-2">Recent Notes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recentNotes.map((note) => (
                        <div key={note.id} className="rounded-lg shadow-md p-6">
                            <h3 className="text-[14px] font-semibold mb-2">{note.title}</h3>
                            <p className="text-gray-500 text-sm">{Date(note.createdAt).slice(0, 24)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
// AliAli12