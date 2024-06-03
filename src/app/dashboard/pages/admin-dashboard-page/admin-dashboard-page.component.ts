import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommunitiesService } from './../../../communities/communities.service';
import { Community } from '../../../communities/interfaces/community.interface';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { TopBarComponent } from '../../../shared/components/navigation/top-bar/top-bar.component';
import { CommunitiesTableComponent } from '../../../communities/components/communities-table/communities-table.component';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    CommunitiesTableComponent,
    PaginatorComponent,
    RouterModule,
    SpinnerComponent,
    TopBarComponent,
  ],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.scss'
})
export class AdminDashBoardPageComponent implements OnInit {

  deleteCommunity(arg0: string) {
    throw new Error('Method not implemented.');
  }

  private readonly communitiesService = inject(CommunitiesService);
  recordsLoaded = false;
  communities!: Signal<Community[]>;

  ngOnInit(): void {
    this.communities = computed(() =>
      this.communitiesService.communities()
    );
    this.communitiesService.findCommunities().subscribe(
      () => {
        this.recordsLoaded = true;
      }
    );
  }

}
