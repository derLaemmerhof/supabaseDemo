export function GET(request) {
	const name = request.params.name || 'World';
	return new Response(`Hello ${name}!`);
}
