<?php

namespace App\Http\Controllers;

use App\Models\Keuangan;
use App\Http\Requests\StoreKeuanganRequest;
use App\Http\Requests\UpdateKeuanganRequest;
use App\Http\Resources\KeuanganResource;
use Illuminate\Support\Facades\Auth;

class KeuanganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Keuangan::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $keuangans = $query->orderBy($sortField, $sortDirection)->paginate(10);

        return Inertia("Keuangan/Index", [
            "keuangans" => KeuanganResource::collection($keuangans),
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Keuangan/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKeuanganRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        Keuangan::create($data);

        return to_route('keuangan.index')->with('success', 'Keuangan Ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Keuangan $keuangan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Keuangan $keuangan)
    {
        return inertia('Keuangan/Edit', [
            'keuangan' => new KeuanganResource(($keuangan)),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKeuanganRequest $request, Keuangan $keuangan)
    {
        $data = $request->validated();

        $keuangan->update($data);

        return to_route('keuangan.index')->with('success', "Keuangan Berhasil Diubah");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Keuangan $keuangan)
    {
        $keuangan->delete();

        return to_route('keuangan.index')->with('success', "Keuangan Berhasil Dihapus");
    }
}
