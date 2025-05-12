// PackageTable.jsx
"use client";
import { CircleX,CircleCheck, Radius } from 'lucide-react';
import styles from './PackageTable.module.css';
const PackageTable = () => {
	return (
		<div className={`container mx-auto pb-3 pb-3 ${styles.tableContainer}`}>
			<table className={styles.table}>
				<thead>
					<tr className="text-left">
						<th className="py-1 px-4 font-semibold uppercase tracking-wider text-center border-r border-white" style={{ backgroundColor: "#A4D3FF", color: "#010066", width: "25%" , borderRadius: ".625rem 0 0 0" }}>
							Package
						</th>
						<th className="py-1 px-4 font-semibold uppercase tracking-wider text-center align-bottom border-r border-white" style={{ backgroundColor: "#65A4DE", color: "#FFFFFF" }}>
							<p style={{ fontSize: "1.125em", fontWeight: "normal" }}>บัตรเดี่ยว</p>
							<p style={{ fontSize: "0.7em", fontWeight: "normal" }}>(Single Pass)</p>
							<p style={{ fontSize: "1.5em", fontWeight: "normal" }}>999</p>
						</th>
						<th className="py-1 px-4 font-semibold uppercase tracking-wider text-center align-bottom border-r border-white" style={{ backgroundColor: "#65A4DE", color: "#FFFFFF" }}>
							<p style={{ fontSize: "1.125em", fontWeight: "normal" }}>บัตรคู่ </p>
							<p style={{ fontSize: "0.7em", fontWeight: "normal" }}>(Buddy Pass)</p>
							<p style={{ fontSize: "1.5em", fontWeight: "normal" }}>2,890</p>
						</th>
						<th className="py-1 px-4 font-semibold uppercase tracking-wider text-center align-bottom border-r border-white" style={{ backgroundColor: "#65A4DE", color: "#FFFFFF" , borderRadius: "0 .625rem 0 0" }}>
							<p style={{ fontSize: "1.125em", fontWeight: "normal" }}>บัตรครอบครัว </p>
							<p style={{ fontSize: "0.7em" ,fontWeight: "normal"}}>(Family Pass)</p>
							<p style={{ fontSize: "1.5em", fontWeight: "normal" }}>5,490</p>
						</th>
					</tr>
				</thead>
				<tbody>
					<TableRow label="ราคารวม Vat" single="1,068.93 บาท" buddy="3,092.30 บาท" family="5,874.30 บาท" rowIndex={0} />
					<TableRow label="เฉลี่ยต่อคน (รวม Vat)" single="1,068.93 บาท" buddy="1,546.15 บาท" family="1,468.57 บาท" rowIndex={1} />
					<TableRow label="จำนวนผู้ใช้" single="1 คน" buddy="2 คน" family="4 คน" rowIndex={2} />
					<TableRow label="บัตรคูปองอาหาร" single={<RedX />} buddy="500 บาท" family="1,000 บาท" rowIndex={3} />
					<TableRow label="อายุการใช้งานบัตร 90 วัน นับจากวันที่ซื้อ" single={<GreenCheck />} buddy={<GreenCheck />} family={<GreenCheck />} rowIndex={4} />
					<TableRow label="ใช้งานบัตรในวันเดียวกัน" single={<GreenCheck />} buddy={<GreenCheck />} family={<GreenCheck />} rowIndex={5} />
					<TableRow label="กิจกรรมพิเศษ สนุกกับโชว์อลังการ & ภาพยนตร์ในคลื่นยักษ์" single={<GreenCheck />} buddy={<GreenCheck />} family={<GreenCheck />} rowIndex={6} />
				</tbody>
			</table>
		</div>
	);
};

const TableRow = ({ label, single, buddy, family, rowIndex }) => {
	const isEven = rowIndex % 2 === 0;
	const rowStyle = {
	backgroundColor: isEven ? "#E6EBFF" : "white",
	color: "#010066",
	};

	return (
		<tr className="border-b last:border-0" style={ rowStyle }>
			<td className="py-1 px-3 border-r border-white" style={rowIndex === 6 ? {borderRadius: "0 0 0 .625rem" }:{}} > { label } </td>
			<td className="py-1 px-3 text-center border-r border-white"> { single } </td>
			<td className="py-1 px-3 text-center border-r border-white"> { buddy } </td>
			<td className="py-1 px-3 text-center border-r border-white" style={rowIndex === 6 ? {borderRadius: "0 0 .625rem 0" }:{}}> { family } </td>
		</tr>
	);
};

const GreenCheck = () => (
	<span style={{ color: "green", display: "flex", justifyContent: "center", alignItems: "center" }}>
		<CircleCheck />
	</span>
);
const RedX = () => (
	<span style={{ color: "red" , display: "flex" , justifyContent: "center" , alignItems: "center"  }}> 
	 <CircleX />
	 </span>
);

export default PackageTable;