<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterUserAction
{
    public function execute(array $data): array
    {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

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
