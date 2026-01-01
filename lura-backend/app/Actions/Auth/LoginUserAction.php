<?php

namespace App\Actions\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginUserAction
{
    public function execute(array $data): array
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

        $expiresAt = now()->addDays(60);

        $token = $user->createToken('user', ['*'], $expiresAt);

        return [
            'message' => 'Authenticated successfully',
            'user' => $user,
            'token' => $token->plainTextToken,
            'expires_at' => $expiresAt->toDateTimeString(),
        ];
    }
}
