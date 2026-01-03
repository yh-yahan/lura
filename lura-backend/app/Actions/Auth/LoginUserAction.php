<?php

namespace App\Actions\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class LoginUserAction
{
    public function execute(array $data, ?Request $request = null): array
    {
        $credentials = [
            'email' => $data['email'],
            'password' => $data['password'],
        ];

        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = Auth::user();

        if ($data['client_type'] === 'web') {
            if ($request && $request->hasSession()) {
                $request->session()->regenerate();
            }

            Auth::guard('web')->login($user);

            return [
                'message' => 'Authenticated successfully',
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
