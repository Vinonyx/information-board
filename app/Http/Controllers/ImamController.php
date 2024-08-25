<?php

namespace App\Http\Controllers;

use App\Models\Imam;
use App\Http\Resources\ImamResource;
use App\Http\Requests\StoreImamRequest;
use App\Http\Requests\UpdateImamRequest;
use Illuminate\Support\Facades\Auth;

class ImamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Imam::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        $imams = $query->orderBy($sortField, $sortDirection)->paginate(10);

        return Inertia("Imam/Index", [
            "imams" => ImamResource::collection($imams),
            "queryParams" => request()->query() ?: null,
            "success" => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Imam/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImamRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        Imam::create($data);

        return to_route('imam.index')->with('success', 'Imam Ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(Imam $imam)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Imam $imam)
    {
        return inertia('Imam/Edit', [
            'imam' => new ImamResource(($imam)),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateImamRequest $request, Imam $imam)
    {
        $data = $request->validated();

        $imam->update($data);

        return to_route('imam.index')->with('success', "Imam Berhasil Diubah");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Imam $imam)
    {
        $imam->delete();

        return to_route('imam.index')->with('success', "Imam Berhasil Dihapus");
    }

    public function getNama()
    {
        $imam = Imam::all();
        return response()->json($imam);
    }
}
