<script lang="ts">
	import type { CVData } from '$lib/types/cv';
	export let data: {
		cv: CVData
	};
	const { cv } = data;
	
	let link_prefixes: Record<string, string> = {
		email: 'mailto:',
		phone: 'tel:',
		linkedin: 'https://www.linkedin.com/in',
	};

	const pattern_bold = /\*(.*?)\*/g;
	const pattern_italic = /_(.*?)_/g;
	const pattern_small = /µ(.*?)µ/g;
	function parseEmphasis(text:string) {
		return text
			.replace(pattern_bold, '<span class="bold">$1</span>')
			.replace(pattern_italic, '<span class="italic">$1</span>')
			.replace(pattern_small, '<span class="small">$1</span>');
	}
	
</script>

<svelte:head>
	<title>Resume - {cv.first_name} {cv.name}</title>
	{#each cv.styles as name}
		<link rel="stylesheet" href={`/files/styles/${name}.css`}>
	{/each}
</svelte:head>

<div class="page flex h-full w-full flex-col justify-between">
	<header class="flex items-start cv-header">
		<div class="flex flex-col cv-section">
			<h1 class="text-0">{cv.job} - {cv.specialty}</h1>
			<p class="text-desc">{cv.introduction}</p>
		</div>
		
		<div class="flex flex-col cv-section h-full">
			<h1 class="text-0 whitespace-nowrap">
					{cv.first_name} <span class="small-caps">{cv.name}</span>
			</h1>
			<div class="flex flex-col text-2 justify-between h-full">
				{#each Object.entries(cv.informations) as [info_type, info_value]}
				<div class="flex items-end cv-info-row">
					<div
						class="icon cv-icon"
						style="
							-webkit-mask: url('/img/{info_type}.svg') no-repeat center / contain;
							mask: url('/img/{info_type}.svg') no-repeat center / contain;
						"
					></div>
					{#if link_prefixes.hasOwnProperty(info_type)}
						<a href={link_prefixes[info_type] + info_value.replace(/\s+/g, '')}>{info_value}</a>
					{:else}
						<span>{info_value}</span>
					{/if}
				</div>
				{/each}
			</div>
		</div>
	</header>
	
	{#each cv.sections as section}
		<div class="flex flex-col cv-section">
			<div class="flex items-end">
				<h2 class="text-1 whitespace-nowrap">{section.title}</h2>
				<div class="flex-grow rounded-full separator"></div>
			</div>
			<div
				class="flex flex-col"
				class:cv-gap-compact={section.type === 'compact'}
				class:cv-gap-regular={section.type !== 'compact'}
			>
				{#each section.subsections as subsection}
				<div>
					{#if section.type === 'compact'}
					<div class="flex items-baseline cv-compact-row">
						{#if subsection.title}
						<h3 class="text-2 text-nowrap cv-title-compact">{subsection.title}</h3>
						{/if}
						<p class="text-4">{subsection.items.join(', ')}</p>
						{#if subsection.dates}
						<h4 class="text-3 ml-auto date">{subsection.dates?.[0]}</h4>
						{/if}
					</div>
					{:else}
					{#if subsection.title}
					<div class="flex cv-subsection-title">
						<h3 class="text-nowrap text-2">{subsection.title}</h3>
						<div class="flex justify-between items-center text-3 ml-auto date">
							<h4>{subsection.dates?.[0]}</h4>
							{#if subsection.dates && subsection.dates.length > 1}
							<span>-</span>
							{/if}
							<h4>{subsection.dates?.[1]}</h4>
						</div>
					</div>
					{/if}
					<div class="flex flex-col cv-subsection-content">
						{#each subsection.items as item, i}
						<p class="text-4">{@html parseEmphasis(item)}</p>
						{/each}
					</div>
					{/if}
				</div>
				{/each}
			</div>
		</div>
		{/each}
</div>