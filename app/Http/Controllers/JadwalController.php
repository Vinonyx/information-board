<?php

namespace App\Http\Controllers;

use App\Http\Resources\JadwalResource;
use App\Models\Jadwal;
use App\Http\Requests\StoreJadwalRequest;
use App\Http\Requests\UpdateJadwalRequest;
use Illuminate\Support\Facades\Auth;

class JadwalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Jadwal::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("tanggal")) {
            $query->where("tanggal", request("tanggal"));
        }

        $jadwals = $query->orderBy($sortField, $sortDirection)->paginate(10);

        return Inertia("Jadwal/Index", [
            "jadwals" => JadwalResource::collection($jadwals),
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Jadwal/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJadwalRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        Jadwal::create($data);

        return to_route('jadwal.index')->with('success', 'Jadwal Ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Jadwal $jadwal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jadwal $jadwal)
    {
        return inertia('Jadwal/Edit', [
            'jadwal' => new JadwalResource(($jadwal)),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJadwalRequest $request, Jadwal $jadwal)
    {
        $data = $request->validated();

        $jadwal->update($data);

        return to_route('jadwal.index')->with('success', "Jadwal Berhasil Diubah");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jadwal $jadwal)
    {
        $jadwal->delete();

        return to_route('jadwal.index')->with('success', "Jadwal Berhasil Dihapus");
    }
}
