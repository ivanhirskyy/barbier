export default defineNuxtRouteMiddleware((to, from) => {
  const user = useStrapiUser();
  console.log('user', user.value);
  /* if (!user.value) {
    useCookie('redirect', { path: '/' }).value = to.fullPath;
    return navigateTo('/login');
  } */
  const protectedRoutes = ['profile', 'admin'];

  if (protectedRoutes.includes(to.path.replace('/', '')) && !user.value) {
    return navigateTo('/');
  }

  /* return navigateTo('/landing'); */
});
