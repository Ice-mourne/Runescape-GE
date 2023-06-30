export const load = async ({ fetch }) => {
	const res = await fetch('https://api.github.com/repos/sveltejs/svelte');
	if (res.ok) {
		const data = await res.json();
		return {
			status: 200,
			body: data
		};
	}

	return {
		status: res.status,
		body: {
			error: res.statusText
		}
	};
};
