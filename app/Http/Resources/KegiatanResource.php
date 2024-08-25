<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class KegiatanResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'tanggal' => (new Carbon($this->tanggal))->format('Y-m-d'),
            'waktu' => $this->waktu,
            'deskripsi' => $this->deskripsi,
            'create_at' => (new Carbon($this->create_at))->format('Y-m-d'),
        ];
    }
}
