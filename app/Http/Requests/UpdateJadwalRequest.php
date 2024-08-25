<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\Time;

class UpdateJadwalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tanggal' => ['nullable', 'date'],
            'jam' => ['nullable', new Time],
            'sholat' => ['nullable', 'string'],
            'imam' => ['nullable', 'string'],
            'khatib' => ['nullable', 'string'],
            'muadzin' => ['nullable', 'string'],
            'bilal' => ['nullable', 'string'],
        ];
    }
}
