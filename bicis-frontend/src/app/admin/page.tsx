'use client';

import { useState } from "react";

export default function AdminPage() {
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [loadingExportByDate, setLoadingExportByDate] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleUpdateStations = async () => {
    setLoadingUpdate(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/external-data`, {
        method: 'POST'
      });
      const data = await res.json();
      alert('Estaciones actualizadas correctamente.');
      console.log(data);
    } catch (error) {
      console.error("Error al actualizar estaciones:", error);
      alert("Hubo un error al actualizar las estaciones.");
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleExportStations = async () => {
    setLoadingExport(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/export-csv`);
      if (!res.ok) throw new Error('Error al descargar CSV');
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'stations.csv';
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al exportar CSV:", error);
      alert("Hubo un error al exportar los datos.");
    } finally {
      setLoadingExport(false);
    }
  };

  const handleExportStatusByDate = async () => {
    if (!startDate || !endDate) return;

    setLoadingExportByDate(true);
    try {
      const startEpoch = Math.floor(new Date(startDate).getTime() / 1000);
      const endEpoch = Math.floor(new Date(endDate).getTime() / 1000);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/export-csv/statuses?startdate=${startEpoch}&enddate=${endEpoch}`);
      if (!res.ok) throw new Error('Error al exportar por fechas');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `stations_status_${startEpoch}-${endEpoch}.csv`;
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al exportar status por fechas:", error);
      alert("Hubo un error al exportar los datos por fechas.");
    } finally {
      setLoadingExportByDate(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Panel de Administración</h2>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleUpdateStations} disabled={loadingUpdate}>
          {loadingUpdate ? 'Actualizando...' : 'Actualizar estaciones'}
        </button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleExportStations} disabled={loadingExport}>
          {loadingExport ? 'Descargando...' : 'Descargar datos de estaciones'}
        </button>
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h3>Descargar estados de estaciones por fechas</h3>
      <div style={{ marginTop: '1rem' }}>
        <label>
          Desde:{' '}
          <input
            type="datetime-local"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>
          Hasta:{' '}
          <input
            type="datetime-local"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={handleExportStatusByDate}
          disabled={!startDate || !endDate || loadingExportByDate}
        >
          {loadingExportByDate ? 'Descargando...' : 'Descargar status por fechas'}
        </button>
      </div>
    </div>
  );
}
