import React from "react";
import ReactDOM from "react-dom";
import { ExcelUtility } from "./ExcelUtility.ts";
import {
  BorderLineStyle,
  CellFill,
  IgrExcelModule,
} from "igniteui-react-excel";
import { Workbook } from "igniteui-react-excel";
import { Worksheet } from "igniteui-react-excel";
import { WorkbookFormat } from "igniteui-react-excel";
import { CellReferenceMode } from "igniteui-react-excel";
import { WorksheetMergedCellsRegion } from "igniteui-react-excel";
import { WorksheetCellComment } from "igniteui-react-excel";
import { FormattedString } from "igniteui-react-excel";
import { Formula } from "igniteui-react-excel";
import { Color } from "igniteui-react-core";
import moment from "moment";
import { WorkbookColorInfo } from "igniteui-react-excel";
import { HorizontalCellAlignment } from "igniteui-react-excel";

IgrExcelModule.register();

export class ExcelLibraryWorkingWithCells {
  public canSave = false;
  public wb: Workbook;
  public ws: Worksheet;
  public worksheetRegion: string[] | null;
  public selectedRegion: string | null;
  public cellFeatures: string[];

  public static workbookSave(): void {
    if (this.canSave) {
      ExcelUtility.save(this.wb, "ExcelWorkbook").then(
        (f: any) => {
          console.log("Saved:" + f);
        },
        (e: any) => {
          console.error("ExcelUtility.Save Error:" + e);
        }
      );
    }
  }
  public static workbookParse(wb: Workbook): void {
    if (wb === undefined) {
      this.worksheetRegion = null;
      this.selectedRegion = null;
    } else {
      const names = new Array<string>();
      const worksheets = wb.worksheets();
      const wsCount = worksheets.count;
      //   alert(wsCount);
      for (let i = 0; i < wsCount; i++) {
        const tables = worksheets.item(i).tables();
        const tCount = tables.count;
        for (let j = 0; j < tCount; j++) {
          names.push(worksheets.item(i).name + " - " + tables.item(j).name);
        }
      }
      this.worksheetRegion = names;
      this.selectedRegion = names.length > 0 ? names[0] : null;
    }
    this.wb = wb;
    this.canSave = wb != null;
  }

  public static workbookCreate(TimeSheetDatas): void {
    const wb = new Workbook(WorkbookFormat.Excel2007);
    const monthYear = new Date().toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
    });
    const ReportDate = moment(new Date()).format("DD-MM-YYYY");
    const SheetOne = wb.worksheets().add("Summary for " + monthYear); //WorkSheet Name

    //Row 1
    SheetOne.rows(1).setCellValue(6, "Report Date");
    SheetOne.rows(1).setCellValue(7, ReportDate);

    //Row 2
    SheetOne.mergedCellsRegions().add(2, 3, 2, 7);
    SheetOne.rows(2).setCellValue(
      3,
      "Summary of Effort Metrics for " + monthYear
    );

    SheetOne.rows(1).cells(6).cellFormat.bottomBorderStyle = 1;
    SheetOne.rows(1).cells(6).cellFormat.leftBorderStyle = 1;
    SheetOne.rows(1).cells(6).cellFormat.topBorderStyle = 1;
    SheetOne.rows(1).cells(6).cellFormat.rightBorderStyle = 1;

    SheetOne.rows(1)
      .cells(7)
      .cellFormat.setFormatting(SheetOne.rows(1).cells(6).cellFormat);

    var broderRow = [2, 3, 4, 5, 8, 9];
    var broderCell = [3, 4, 5, 6, 7];
    for (let row = 0; row < broderRow.length; row++) {
      for (let cell = 0; cell < broderCell.length; cell++) {
        SheetOne.rows(broderRow[row])
          .cells(broderCell[cell])
          .cellFormat.setFormatting(SheetOne.rows(1).cells(6).cellFormat);
      }
    }

    SheetOne.rows(2).cells(5).cellFormat.alignment =
      HorizontalCellAlignment.Center;

    SheetOne.rows(2).cells(5).cellFormat.fill =
      CellFill.createSolidFill("#f79c59");

    var color = new Color();
    color.colorString = "#fff";
    SheetOne.rows(2).cells(5).cellFormat.font.colorInfo = new WorkbookColorInfo(
      color
    );

    //Row 3
    SheetOne.rows(3).setCellValue(3, "No of Billable Days");
    SheetOne.rows(3).setCellValue(4, 22);
    SheetOne.rows(3).setCellValue(5, "No of Billable Hours");
    let formula: Formula | null = null;
    formula = Formula.parse("=E4*8", CellReferenceMode.A1);
    formula.applyTo(SheetOne.rows(3).cells(6));

    //Row 4
    SheetOne.rows(4).setCellValue(3, "MTD Days Passed");
    SheetOne.rows(4).setCellValue(4, 20.5);
    SheetOne.rows(4).setCellValue(5, "MTD Expected Hours");
    formula = Formula.parse("=E5*8", CellReferenceMode.A1);
    formula.applyTo(SheetOne.rows(4).cells(6));

    //Row 5
    SheetOne.rows(5).setCellValue(3, "No. Of Leaves");
    SheetOne.rows(5).setCellValue(4, 0.5);
    SheetOne.rows(5).setCellValue(5, "Min MTD Expected Hours");
    formula = Formula.parse("=(E5-E6)*8", CellReferenceMode.A1);
    formula.applyTo(SheetOne.rows(5).cells(6));

    const SheetOneColumns = [
      "Emp Id",
      "Emp Name",
      "Effort Metrics Hours",
      "Deficit/Surplus as of Date",
      "Deficit for the Month",
    ];
    for (let col = 0; col < SheetOneColumns.length; col++) {
      SheetOne.columns(col + 3).width = 6000;
      SheetOne.rows(8).setCellValue(col + 3, SheetOneColumns[col]);
      SheetOne.rows(8).cells(col + 3).cellFormat.fill =
        CellFill.createSolidFill("#f79c59");

      SheetOne.rows(8).cells(col + 3).cellFormat.font.colorInfo =
        new WorkbookColorInfo(color);
    }

    const SheetRow = [
      "53",
      "Logeswaran",
      "=Logeswaran!D1",
      "=$F$10-$G$5",
      "=$F$10-$G$4",
    ];
    for (let col = 0; col < SheetRow.length; col++) {
      if (col < 3) {
        SheetOne.columns(col + 3).width = 5000;
        SheetOne.rows(9).setCellValue(col + 3, SheetRow[col]);
      } else {
        formula = Formula.parse(SheetRow[col], CellReferenceMode.A1);
        formula.applyTo(SheetOne.rows(9).cells(col + 3));
      }
    }

    const SheetTwo = wb.worksheets().add("Logeswaran");
    SheetTwo.mergedCellsRegions().add(0, 0, 0, 2);
    SheetTwo.rows(0).setCellValue(0, "Effort Metrics Reported Thru Email");
    formula = Formula.parse(
      "=SUM(G3:G" + (TimeSheetDatas.length + 2) + ")",
      CellReferenceMode.A1
    );
    formula.applyTo(SheetTwo.rows(0).cells(3));
    const SheetTwoColumns = [
      "Date",
      "Status",
      "Project",
      "Description",
      "Actual / Estimated completion Date",
      "Objects Changed",
      "Hours",
    ];

    var color = new Color();
    color.colorString = "#fff";
    for (let col = 0; col < SheetTwoColumns.length; col++) {
      if (col === 3) SheetTwo.columns(col).width = 8000;
      else SheetTwo.columns(col).width = 4000;

      SheetTwo.rows(1).setCellValue(col, SheetTwoColumns[col]);

      SheetTwo.rows(1).cells(col).cellFormat.fill =
        CellFill.createSolidFill("#387dc2");

      SheetTwo.rows(1).cells(col).cellFormat.font.colorInfo =
        new WorkbookColorInfo(color);
    }

    // let expanseCol = 0;
    // for (const key of SheetTwoColumns) {
    //   SheetTwo.columns(expanseCol).width = 5000;
    //   SheetTwo.rows(1).setCellValue(expanseCol, key);
    //   SheetTwo.rows(1).cells(expanseCol).cellFormat.fill =
    //     CellFill.createSolidFill("#f79c59");
    //   expanseCol++;
    // }

    for (let col = 0; col < TimeSheetDatas.length; col++) {
      let rowData = TimeSheetDatas[col];
      SheetTwo.rows(col + 2).setCellValue(0, rowData["TaskDate"]);
      SheetTwo.rows(col + 2).setCellValue(1, rowData["Status"]);
      SheetTwo.rows(col + 2).setCellValue(2, rowData["ProjectName"]);
      SheetTwo.rows(col + 2).setCellValue(3, rowData["TaskDescription"]);
      SheetTwo.rows(col + 2).cells(3).cellFormat.wrapText = true;
      SheetTwo.rows(col + 2).setCellValue(4, "");
      SheetTwo.rows(col + 2).setCellValue(5, rowData["Object"]);
      SheetTwo.rows(col + 2).setCellValue(6, rowData["Hours"]);
    }

    this.workbookParse(wb);
    this.workbookSave();
  }
}
