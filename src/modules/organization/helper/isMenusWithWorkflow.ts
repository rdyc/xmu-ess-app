export const isMenusWithWorkflow = (menu: string): boolean => {
  let result = false;

  const menus: string[] = [
    'MNU12', 'MNU13', 'MNU16', 'MNU17', 'MNU30', 'MNU42', 'MNU45',
  ];
   
  result = menus.indexOf(menu) !== -1;

  return result;
};