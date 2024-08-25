<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Http\Requests\StoreKegiatanRequest;
use App\Http\Requests\UpdateKegiatanRequest;
use App\Http\Resources\KegiatanResource;
use Illuminate\Support\Facades\Auth;

class KegiatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Kegiatan::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("tanggal")) {
            $query->where("tanggal", request("tanggal"));
        }

        $kegiatans = $query->orderBy($sortField, $sortDirection)->paginate(10);

        return Inertia("Kegiatan/Index", [
            "kegiatans" => KegiatanResource::collection($kegiatans),
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Kegiatan/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKegiatanRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        Kegiatan::create($data);

        return to_route('kegiatan.index')->with('success', 'Kegiatan Ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kegiatan $kegiatan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kegiatan $kegiatan)
    {
        return inertia('Kegiatan/Edit', [
            'kegiatan' => new KegiatanResource(($kegiatan)),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKegiatanRequest $request, Kegiatan $kegiatan)
    {
        $data = $request->validated();

        $kegiatan->update($data);

        return to_route('kegiatan.index')->with('success', "Kegiatan Berhasil Diubah");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kegiatan $kegiatan)
    {
        $kegiatan->delete();

        return to_route('kegiatan.index')->with('success', "Kegiatan Berhasil Dihapus");
    }
}
