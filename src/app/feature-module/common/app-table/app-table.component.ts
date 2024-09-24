import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TablePaginationConfig } from 'src/app/core/models/common/TablePaginationConfig';
import { AppPagginationComponent } from '../app-paggination/app-paggination.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,FormsModule,AppPagginationComponent],
  templateUrl: './app-table.component.html',
  styleUrl: './app-table.component.scss'
})
export class AppTableComponent implements OnChanges,AfterViewInit{

  //#region inputs & outputs
  @ViewChild('TABLE') table!: ElementRef; // for getting the specific table element
  @Input() tableHead: TemplateRef<any> | null = null; // for display the table head columns
  @Input() tableBody: TemplateRef<any> | null = null; // for display the table body data
  @Input() data: any[] = []; // for the data
  @Input() totalRecords:number= 0; // for the total numbres of data records
  @Input() tableClass:string=''; // for the table style for ex : ['table table-bordered']
  @Input() columnFilters = ['']; // for the column that will be search in for ex : ['name']
  @Input() pagination: boolean = false; // for display the paggination or not
  @Input() search: boolean = false; // for display the search or not
  @Input() showExports: boolean = false; // for display the Export DropDwon or not
  @Input() Size:number= 0; // for the size of records  per page
  @Input() Limits:number[] = []; // for the limits that will be displayed for the user  for ex : [5,10,20,50]
  
  @Output() onPageChnage = new EventEmitter<{ page: number, pageSize:number  }>();
  @Output() onLimitChange = new EventEmitter<{ page: number, pageSize:number  }>();
  
  //#endregion
  
  //#region table config
  tableConfig: TablePaginationConfig = {
    page: 1,
    pageSize: 5,//this.pageSize,
    totalPages: 0,
    totalRecord:this.totalRecords
  };
  //#endregion
  
  //#region table variables
  columnsNumber=0;
  tableData: any[] = [];
  searchTerm='';
  //#endregion
  
  //#region Hooks
  constructor(private cdr: ChangeDetectorRef) {}
  
    ngOnChanges(): void {
      this.initialPagination();
  
    }
  
    ngAfterViewInit(): void {
      const columnCount = this.getColumnCount();
      this.columnsNumber = columnCount;
      this.cdr.detectChanges();
    }
  //#endregion
  
  //#region table functions
  initialPagination(){
    this.tableConfig={
      ...this.tableConfig,
      totalPages : Math.ceil(this.tableConfig.totalRecord / this.tableConfig.pageSize)
    }
  
    this.refreshTable();
  }
  
  refreshTable(){
    let data = this.data;
    this.tableConfig.totalPages = Math.ceil(this.totalRecords / this.tableConfig.pageSize);
    this.tableData = data;
  }
  
  getColumnCount(): number {
    const tableElement = this.table.nativeElement;
    // Find the header row (assuming the first row contains headers)
    const headerRow = tableElement.querySelector('thead tr');
    if (headerRow) {
      return headerRow.children.length;
    }
    // Fallback to first row in tbody if thead is not present
    const firstRow = tableElement.querySelector('tbody tr');
    if (firstRow) {
      return firstRow.children.length;
    }
    return 0;
  }
  
  matches(data: any) {
    let columns = Object.keys(data);
    for (let index = 0; index < columns.length; index++) {
      if (this.columnFilters.includes(columns[index])) {
        if (
          data[columns[index]]
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        ) {
          return true;
        }
      }
    }
    return false;
  }
  
  onSearch(event:any){
    let data = this.data;
    const input = event.target as HTMLInputElement;
    if (input.value !== '') {
      data = this.data.filter((item) => this.matches(item));
      this.tableConfig.totalPages = Math.ceil(data.length / this.tableConfig.pageSize);
    }
    this.tableData = data;
    console.log('Search term:', input.value);
  }
  
  pageChange(page: number) {
  
    this.emptyTheInputValue();
    this.tableConfig = {
      ...this.tableConfig,
      page: page,
    };
  this.onPageChnage.emit( {
    page:this.tableConfig.page,
    pageSize:this.tableConfig.pageSize
  })
    this.refreshTable();
  }
  
  pageLimitChange(){
    this.emptyTheInputValue();
    this.tableConfig = {
      ...this.tableConfig,
      pageSize: Number(this.Size),
      page:1
    };
  this.onLimitChange.emit( {
    page:1,
    pageSize:this.tableConfig.pageSize
  })
    this.refreshTable();
  }
  
  getDisplayedPages(): number[] {
    const totalPages = this.tableConfig.totalPages;
    const currentPage = this.tableConfig.page;
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);
  
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    return pages;
  }
  
  getMin(a1:number,a2:number):number{
    return  Math.min(a1, a2)
  }
  


  
  emptyTheInputValue(){
    this.searchTerm =''
  }
  
  //#endregion
  
  
  
  }
  