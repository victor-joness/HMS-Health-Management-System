export const Equals = <T extends object>(objetoA: T, objetoB: T): boolean => {
    const aChaves = Object.keys(objetoA);
    const bChaves = Object.keys(objetoB);
  
    if (aChaves.length !== bChaves.length) {
      return false;
    }
  
    const saoDiferentes = aChaves.some((chave) => {
      return (objetoA as any)[chave] !== (objetoB as any)[chave];
    });
  
    return !saoDiferentes;
  };
  