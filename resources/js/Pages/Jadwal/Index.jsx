import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, jadwals, queryParams = null, success }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("jadwal.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("jadwal.index"), queryParams);
    };

    const deletejadwal = (jadwal) => {
        if (!window.confirm("Are you sure you want to delete the jadwal?")) {
            return;
        }
        router.delete(route("jadwal.destroy", jadwal.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading tight">
                        jadwals
                    </h2>
                    <Link
                        href={route("jadwal.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Jadwal Sholat" />

            <div className="py-12">
                <div className="max-w-7-xl mx-auto sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                            {success}
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading
                                                name="id"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                No
                                            </TableHeading>
                                            <TableHeading
                                                name="tanggal"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Tanggal
                                            </TableHeading>
                                            <TableHeading
                                                name="jam"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Jam
                                            </TableHeading>
                                            <TableHeading
                                                name="sholat"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Sholat
                                            </TableHeading>
                                            <TableHeading
                                                name="imam"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Imam
                                            </TableHeading>
                                            <TableHeading
                                                name="khatib"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Khatib
                                            </TableHeading>
                                            <TableHeading
                                                name="muadzin"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Muadzin
                                            </TableHeading>
                                            <TableHeading
                                                name="bilal"
                                                sort_field={
                                                    queryParams.sort_field
                                                }
                                                sort_direction={
                                                    queryParams.sort_direction
                                                }
                                                sortChanged={sortChanged}
                                            >
                                                Bilal
                                            </TableHeading>
                                            <th className="px-3 py-2 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3">
                                                <TextInput
                                                    className="w-full"
                                                    defaultValue={
                                                        queryParams.tanggal
                                                    }
                                                    type="date"
                                                    placeholder="Tanggal"
                                                    onBlur={(e) =>
                                                        searchFieldChanged(
                                                            "tanggal",
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyPress={(e) =>
                                                        onKeyPress("tanggal", e)
                                                    }
                                                />
                                            </th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                            <th className="px-3 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jadwals.data.map((jadwal) => (
                                            <tr
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                                key={jadwal.id}
                                            >
                                                <td className="px-3 py-2">
                                                    {jadwal.id}
                                                </td>
                                                <td className="px-3 py-2">
                                                    {jadwal.tanggal}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {jadwal.jam}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {jadwal.sholat}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {jadwal.imam}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {jadwal.khatib}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {jadwal.muadzin}
                                                </td>
                                                <td className="px-3 py-2 text-nowrap">
                                                    {jadwal.bilal}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    <Link
                                                        href={route(
                                                            "jadwal.edit",
                                                            jadwal.id
                                                        )}
                                                    >
                                                        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                                                            Edit
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={(e) =>
                                                            deletejadwal(jadwal)
                                                        }
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination links={jadwals.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
