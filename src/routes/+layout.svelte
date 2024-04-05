<script lang="ts">
    let { children } = $props();
    import "../app.pcss";
</script>
<div class='bg-background min-h-screen font-sans antialiased' >
    {@render children()}
</div>



