// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type stytch from 'stytch';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: stytch.Session;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

/// <reference types="@sveltejs/kit" />
