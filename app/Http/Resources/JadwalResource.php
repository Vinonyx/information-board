<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class JadwalResource extends JsonResource
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
            'tanggal' => (new Carbon($this->tanggal))->format('Y-m-d'),
            'jam' => $this->jam,
            'create_at' => (new Carbon($this->create_at))->format('Y-m-d'),
            'sholat' => $this->sholat,
            'imam' => $this->imam,
            'khatib' => $this->khatib,
            'muadzin' => $this->muadzin,
            'bilal' => $this->bilal,
        ];
    }
}
