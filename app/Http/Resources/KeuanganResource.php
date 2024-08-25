<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class KeuanganResource extends JsonResource
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
            'transaksi' => $this->transaksi,
            'penerimaan' => $this->penerimaan,
            'pengeluaran' => $this->pengeluaran,
            'keterangan' => $this->keterangan,
            'create_at' => (new Carbon($this->create_at))->format('Y-m-d'),
        ];
    }
}
