<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class RegisterUserAction
{
    public function execute(array $data, ?Request $request = null): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if ($data['client_type'] === 'web') {
            Auth::guard('web')->login($user);

            if ($request && $request->hasSession()) {
                $request->session()->regenerate();
            }

            return [
                'message' => 'Registered and logged in successfully',
                'user' => $user,
            ];
        }

        $deviceName = $data['device_name'] ?? 'unknown-device';
        $expiresAt = now()->addDays(60);

        $token = $user->createToken($deviceName, ['*'], $expiresAt);

        return [
            'message' => 'Authenticated successfully',
            'user' => $user,
            'token' => $token->plainTextToken,
            'expires_at' => $expiresAt->toDateTimeString(),
        ];
    }
}
