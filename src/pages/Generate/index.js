/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  TableBody,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  calculatePeriode,
  mappingRegional,
  decimalNumber,
  convertDate,
} from "../../utils";
import { getOffice } from "../../actions/references";
import PropTypes from "prop-types";
import api from "../../api";

const LIST = [
  { label: "Januari", value: "01" },
  { label: "Februari", value: "02" },
  { label: "Maret", value: "03" },
  { label: "April", value: "04" },
  { label: "Mei", value: "05" },
  { label: "Juni", value: "06" },
  { label: "Juli", value: "07" },
  { label: "Agustus", value: "08" },
  { label: "September", value: "09" },
  { label: "Oktober", value: "10" },
  { label: "November", value: "11" },
  { label: "Desember", value: "12" },
];

const getKenaPajak = (bruto) => {
  const setbruto = Math.floor((Number(bruto) * 50) / 100);
  const ptkp = 4500000;
  const p = setbruto - ptkp;
  if (p <= 0) {
    return 0;
  } else {
    return p;
  }
};

const getPPh = (bruto) => {
  const pajak = getKenaPajak(bruto);
  return (((5 / 100) * 120) / 100) * pajak;
};

const PREV_YEAR = new Date().getFullYear() - 1;

const getListYear = () => {
  const result = [];
  for (let i = 1; i < 5; i++) {
    result.push(Number(PREV_YEAR) + i);
  }

  return result;
};

function Generate(props) {
  const [periode, setperiode] = useState("00");
  const [showlable, setshowlable] = useState({
    visible: false,
    start: "",
    end: "",
  });
  const [filter, setfilter] = useState({
    regions: [],
    choosedregion: "P0",
    choosedoffice: "P0",
  });
  const [preview, setpreview] = useState([]);
  const [loading, setloading] = useState(false);
  const [tableType, settableType] = useState("fee");
  const [year, setyear] = useState(PREV_YEAR);
  const [generateLoading, setgenerateLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await props.getOffice();
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(props.offices).length > 0) {
      let regions = [];
      for (var property in props.offices) {
        regions.push(property);
      }

      setfilter((prev) => ({ ...prev, regions }));
    }
  }, [props.offices]);

  useEffect(() => {
    if (periode !== "00") {
      const date = `${year}-${periode}-02`; //not required tanggal but still need to pass it
      const newPeriode = calculatePeriode(new Date(date), 20);
      setshowlable({ visible: true, ...newPeriode });
    } else {
      setshowlable((prev) => ({ ...prev, visible: false }));
    }
  }, [periode]);

  const handlePreview = async () => {
    if (periode !== "00") {
      setloading(true);
      try {
        const { status, message, data } = await api.trx.getGenerate({
          tgl_awal: showlable.start,
          tgl_akhir: showlable.end,
          regional: mappingRegional(filter.choosedregion),
          kprk: filter.choosedoffice,
        });
        if (status) {
          if (data.length > 0) {
            setpreview(data);
          } else {
            alert("DATA TIDAK DITEMUKAN");
          }
        } else {
          alert(message);
        }
      } catch (error) {
        alert("DATA TIDAK DITEMUKAN");
      }
      setloading(false);
    }
  };

  const handleSubmit = async () => {
    setgenerateLoading(true);

    const tempUpah = preview.map((row) => ({
      id_mitra: row.id_mitra,
      insentif: row.bsu_insentif,
      fee: row.bsu_fee,
      nopend: row.kprk,
      total_fee: row.total_fee,
      status: 2,
      bonus: row.bonus,
      produksi: row.berhasil_antar,
      bulan_transaksi: `${year}-${periode}`,
      id_imbal: "0",
      penghasilan: 0,
      pajak: 0,
      denda: 0,
    }));

    const tempPajak = preview.map((row) => ({
      id_mitra: row.id_mitra,
      total_fee: row.total_fee,
      set_bruto: Math.floor((Number(row.total_fee) * 50) / 100),
      ptkp: 4500000,
      pajak_sd_bln: getKenaPajak(row.total_fee),
      pajak_kumulatif: getPPh(row.total_fee),
      pph: 0,
      pph21: Number(row.total_fee) - getPPh(row.total_fee),
      tgl: convertDate(new Date(), "pajak"),
      terbayar: Number(row.total_fee) - getPPh(row.total_fee),
      status: "2",
      id_user: props.userid,
    }));

    try {
      const add = await Promise.all([
        await api.trx.generateUpah({
          trx: tempUpah,
          periode: `${year}-${periode}`,
        }),
        await api.trx.generatePajak({
          trx: tempPajak,
          periode: `${year}-${periode}`,
        }),
      ]);

      const upah = add[0].status;
      const pajak = add[0].status;
      if (upah === true && pajak === false) {
        alert("Generate pajak failed");
      } else if (pajak === true && upah === false) {
        alert("Generate upah failed");
      } else if (pajak === true && upah === true) {
        alert("Data berhasil digenerate");
        resetState();
      } else {
        alert("Failed..");
      }
    } catch (error) {
      console.log({ error });
      alert(error.toString());
    }

    setgenerateLoading(false);
  };

  const resetState = () => {
    setpreview([]);
    setfilter((prev) => ({
      ...prev,
      choosedregion: "P0",
      choosedoffice: "P0",
    }));
    setshowlable({ visible: false, start: "", end: "" });
    setperiode("00");
  };

  var no = 1;

  return (
    <Box>
      <Grid container spacing={1} justifyContent="flex-end">
        <Grid item sm={6} md={3} lg={2}>
          <FormControl fullWidth>
            <Select
              disabled={preview.length > 0}
              size="small"
              value={filter.choosedregion}
              onChange={(e) =>
                setfilter((prev) => ({
                  ...prev,
                  choosedregion: e.target.value,
                }))
              }
            >
              <MenuItem value="P0">
                <em>Semua wilayah</em>
              </MenuItem>
              {filter.regions.map((row, i) => (
                <MenuItem value={row} key={i}>
                  {row.replace(/[_]/g, " ")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {filter.choosedregion !== "P0" && (
          <Grid item sm={6} md={3} lg={2}>
            <FormControl fullWidth>
              <Select
                disabled={preview.length > 0}
                size="small"
                value={filter.choosedoffice}
                onChange={(e) =>
                  setfilter((prev) => ({
                    ...prev,
                    choosedoffice: e.target.value,
                  }))
                }
              >
                <MenuItem value="P0">
                  <em>Semua kantor</em>
                </MenuItem>
                {props.offices[filter.choosedregion].map((row, i) => (
                  <MenuItem key={i} value={row.nopend}>
                    {row.nopend} - {row.kantor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        <Grid item sm={6} md={3} lg={2}>
          <FormControl fullWidth>
            <Select
              size="small"
              disabled={preview.length > 0}
              value={periode}
              onChange={(e) => setperiode(e.target.value)}
            >
              <MenuItem value="00">
                <em>--Pilih periode--</em>
              </MenuItem>
              {LIST.map((row) => (
                <MenuItem value={row.value} key={row.value}>
                  {row.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6} md={3} lg={1}>
          <FormControl fullWidth>
            <Select
              size="small"
              disabled={preview.length > 0}
              value={year}
              onChange={(e) => setyear(e.target.value)}
            >
              <MenuItem value={PREV_YEAR}>{PREV_YEAR}</MenuItem>
              {getListYear().map((row) => (
                <MenuItem value={row} key={row}>
                  {row}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6} md={3} lg={2}>
          <Button
            fullWidth
            disabled={periode === "00" || loading || preview.length > 0}
            variant="contained"
            size="small"
            onClick={handlePreview}
            style={{
              textTransform: "none",
              minHeight: 40,
              maxWidth: 300,
            }}
          >
            {loading ? "Loading..." : "Generate"}
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent={"flex-end"} spacing={1}>
        {showlable.visible && preview.length <= 0 && (
          <Grid item lg={5} md={6} xs={12}>
            <FormHelperText>
              Periode yang akan digenerate adalah{" "}
              <span style={{ fontWeight: "bold" }}>{showlable.start}</span>{" "}
              sampai <span style={{ fontWeight: "bold" }}>{showlable.end}</span>
            </FormHelperText>
          </Grid>
        )}
      </Grid>
      {preview.length > 0 && (
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 2 }}>
          <Box
            display={"flex"}
            justifyContent="flex-start"
            alignItems={"center"}
            marginX={2}
            marginY={1}
          >
            <FormControl fullWidth style={{ maxWidth: 200 }}>
              <Select
                size="small"
                value={tableType}
                onChange={(e) => settableType(e.target.value)}
                name="tableType"
              >
                <MenuItem value="fee">Display as fee</MenuItem>
                <MenuItem value="pajak">Display as pajak</MenuItem>
              </Select>
            </FormControl>
            <Box flexGrow={1} />
            <Button
              fullWidth
              size="small"
              variant="outlined"
              color="success"
              style={{
                textTransform: "none",
                minHeight: 40,
                maxWidth: 300,
              }}
              onClick={handleSubmit}
            >
              {generateLoading
                ? "LOADING..."
                : `GENERATE ${preview.length} DATA`}
            </Button>
            <Button
              size="small"
              fullWidth
              onClick={resetState}
              variant="outlined"
              color="error"
              style={{
                textTransform: "none",
                minHeight: 40,
                maxWidth: 300,
                marginLeft: 5,
              }}
            >
              BATAL & RESET
            </Button>
          </Box>
          <TableContainer sx={{ maxHeight: "75vh" }}>
            <Table stickyHeader size="small">
              <TableHead>
                {tableType === "fee" ? (
                  <TableRow>
                    <TableCell>NO</TableCell>
                    <TableCell>KPRK</TableCell>
                    <TableCell>ID MITRA</TableCell>
                    <TableCell>NAMA MITRA</TableCell>
                    <TableCell>JAM KERJA</TableCell>
                    <TableCell align="right">PRODUKSI</TableCell>
                    <TableCell align="right">INSENTIF</TableCell>
                    <TableCell align="right">FEE</TableCell>
                    <TableCell>DENDA</TableCell>
                    <TableCell align="right">BONUS</TableCell>
                    <TableCell align="right">TOTAL FEE</TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>NO</TableCell>
                    <TableCell>ID MITRA</TableCell>
                    <TableCell>NAMA MITRA</TableCell>
                    <TableCell align="right">BRUTO</TableCell>
                    <TableCell align="right">50% BRUTO</TableCell>
                    <TableCell align="right">PTKP</TableCell>
                    <TableCell align="right">KENA PAJAK</TableCell>
                    <TableCell align="right">PAJAK KUMULATIF</TableCell>
                    <TableCell align="right">PPH 21 PERHUTANG</TableCell>
                    <TableCell align="right">PPH 21 TERHUTANG</TableCell>
                    <TableCell align="right">JUMLAH DIBAYARKAN</TableCell>
                  </TableRow>
                )}
              </TableHead>
              <TableBody>
                {tableType === "fee"
                  ? preview.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{no++}</TableCell>
                        <TableCell>{row.kprk}</TableCell>
                        <TableCell>{row.id_mitra}</TableCell>
                        <TableCell>{row.nama_mitra}</TableCell>
                        <TableCell>{row.jumlah_hari}</TableCell>
                        <TableCell align="right">
                          {row.berhasil_antar}
                        </TableCell>
                        <TableCell align="right">
                          {decimalNumber(row.bsu_insentif)}
                        </TableCell>
                        <TableCell align="right">
                          {decimalNumber(row.bsu_fee)}
                        </TableCell>
                        <TableCell>0</TableCell>
                        <TableCell align="right">
                          {decimalNumber(row.bonus)}
                        </TableCell>
                        <TableCell align="right">
                          {decimalNumber(row.total_fee)}
                        </TableCell>
                      </TableRow>
                    ))
                  : preview.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>{no++}</TableCell>
                        <TableCell>{row.id_mitra}</TableCell>
                        <TableCell>{row.nama_mitra}</TableCell>
                        <TableCell align="right">
                          {decimalNumber(row.total_fee)}
                        </TableCell>
                        <TableCell align="right">
                          {decimalNumber(
                            Math.floor((Number(row.total_fee) * 50) / 100)
                          )}
                        </TableCell>
                        <TableCell align="right">4.500.000</TableCell>
                        <TableCell align="right">
                          {decimalNumber(getKenaPajak(row.total_fee))}
                        </TableCell>
                        <TableCell align="right">0</TableCell>
                        <TableCell align="right">
                          {getPPh(row.total_fee)}
                        </TableCell>
                        <TableCell align="right">0</TableCell>
                        <TableCell align="right">
                          {decimalNumber(
                            Number(row.total_fee) - getPPh(row.total_fee)
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}

Generate.propTypes = {
  getOffice: PropTypes.func.isRequired,
  offices: PropTypes.object.isRequired,
  userid: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    offices: state.references.office,
    userid: state.auth.id_mitra,
  };
}

export default connect(mapStateToProps, { getOffice })(Generate);
