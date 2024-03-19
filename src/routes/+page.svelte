<script>
	import { supabase } from '$lib/supabase';

	let promise = supabase.from('countries').select();
	let names = supabase.from('rabbits').select();

	let name = '';

	async function sendName() {
		const response = await fetch('/api/sendName', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name })
		});
		const data = await response.text();
		console.log(data);
		name = '';
		names = supabase.from('rabbits').select();
	}
</script>

<!-- {#await promise}
	<span class="loading loading-ball loading-lg" />
{:then result}
	<ul>
		{#each result.data as country}
			<li>{country.name}</li>
		{/each}
	</ul>
{/await} -->

<form>
	<h2>All my rabbits</h2>
	<input type="text" bind:value={name} /><br />
	<button class="btn" on:click={sendName}>Add rabbit!</button>
</form>

<h2>Rabbit names</h2>
{#await names}
	<span class="loading loading-bars loading-lg text-primary" />
{:then result}
	<ul>
		{#each result.data as rabbit (rabbit.id)}
			<li>{rabbit.name}</li>
		{/each}
	</ul>
{/await}
