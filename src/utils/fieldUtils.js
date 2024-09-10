const getUpdatedFields = (newData, currentData) => {
  // Inicializa el objeto para almacenar los campos que serán actualizados
  const updates = {};

  // Filtra los campos de newData que son diferentes de los de currentData
  Object.keys(newData).forEach((key) => {
    const newValue = newData[key];
    const currentValue = currentData[key];

    // Solo añade al objeto de actualizaciones si el nuevo valor es diferente del valor actual
    if (
      newValue !== undefined &&
      newValue.toString() !== currentValue?.toString()
    ) {
      updates[key] = newValue;
    }
  });

  // Retorna un mensaje si no hay cambios detectados
  if (Object.keys(updates).length === 0) {
    return {
      message: "No cambios detectados, ningun cambios fue realizado.",
      hasChanges: false,
    };
  }

  // Retorna los campos a actualizar si se detectaron cambios
  return {
    updates,
    hasChanges: true,
  };
};

module.exports = { getUpdatedFields };
