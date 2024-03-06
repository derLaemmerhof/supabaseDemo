<script lang="ts">
	import { supabase } from '$lib/supabase.js';

	let loading = false;
	let email = '';
	let noEmail: boolean | null = null;

	const handleLogin = async () => {
		try {
			noEmail = false;
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({ email });
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error && email === '') {
				noEmail = true;
			}
		} finally {
			loading = false;
		}
	};
</script>

<div class="card w-96 bg-neutral text-neutral-content">
	<div class="card-body items-center text-left">
		<div class="row flex-center flex">
			<div class="col-6 form-widget" aria-live="polite">
				<h1 class="header">Supabase + Svelte</h1>
				<p class="description">Sign in via magic link with your email below</p>
				<form class="form-widget" on:submit|preventDefault={handleLogin}>
					<div>
						<label for="email">Email</label>
						<input
							id="email"
							class="inputField"
							type="email"
							placeholder="Your email"
							bind:value={email}
						/>
					</div>
					<div>
						<button type="submit" class="button block" aria-live="polite" disabled={loading}>
							<span>{loading ? 'Loading' : 'Send magic link'}</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
{#if noEmail && noEmail !== null}
	<div role="alert" class="alert">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="stroke-info shrink-0 w-6 h-6"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>Please enter a E-Mail address</span>
	</div>
{:else if !noEmail && noEmail !== null}
	<div role="alert" class="alert">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="stroke-success shrink-0 w-6 h-6"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M5 13l4 4L19 7"
			/></svg
		>
		<span>Magic link sent to your email</span>
	</div>
{/if}
