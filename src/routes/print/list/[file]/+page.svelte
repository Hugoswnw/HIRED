<script lang="ts">
	export let data;
	const { letterData } = data;

	let accent = '#1E93AB';
	let textColor = 'black';
	let background = '#F3F2EC';

	const options = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' };
	const today = new Intl.DateTimeFormat('fr-FR', options).format(new Date());
</script>

<svelte:head>
	<style>
		@page {
			size: A4;
			margin: 0;
		}

		.page {
			width: 210mm;
			height: 297mm;
			margin: 0 auto;
			font-family: Fraunces, 'Zilla Slab', serif;
			overflow: hidden;

			color: var(--text);
			background-color: var(--background);
		}

		.small-caps {
			font-variant-caps: small-caps;
		}

		.sans-serif {
			font-family: Outfit, sans-serif;
		}

		img {
			vertical-align: middle;
			height: 1.3em;
		}

		.text-0,
		.text-1 {
			font-size: 4.6mm;
			line-height: 5.5mm;
			color: var(--text);
		}

		.text-0 {
			font-weight: 800;
		}

		.text-1 {
			font-weight: 400;
		}

		.text-2 {
			font-size: 4mm;
			line-height: 4.6mm;
			font-weight: 350;
		}

		.text-accent {
			color: var(--accent);
		}

		.icon {
			background-color: var(--accent);
		}
	</style>
</svelte:head>

<div
  class="page flex h-full w-full flex-col px-[15mm] py-[15mm]"
  style="--accent: {accent}; --text: {textColor}; --background: {background}"
>
  <div class="flex flex-col gap-[3mm] text-justify text-2">
    {#each letterData as letterBlock, i}
		<div>
			<span class="text-accent font-bold">{i + 1}.</span>
			<span class="m-0">{letterBlock}</span>
		</div>
    {/each}
  </div>
</div>