import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() public member!: Member;

  public uploader!: FileUploader;
  public user!: User;
  public hasBaseDropZoneOver = false;
  public baseUrl = environment.apiUrl;

  constructor(
    private readonly accountService: AccountService,
    private readonly memberService: MembersService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) this.user = user;
      },
    });
  }

  public ngOnInit(): void {
    this.initializeUpload();
  }

  public fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }

  public initializeUpload() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    };
  }

  public setMainPhoto(newMainPhoto: Photo) {
    this.memberService.setMainPhoto(newMainPhoto.id).subscribe({
      next: () => {
        if (this.user && this.member) {
          this.user.photoUrl = newMainPhoto.url;
          this.accountService.setCurrentUser(this.user);
          this.member.photoUrl = newMainPhoto.url;
          this.member.photos.forEach((photo) => {
            photo.isMain && (photo.isMain = false);
            photo.id == newMainPhoto.id && (photo.isMain = true);
          });
        }
      },
    });
  }

  public deletePhoto(deletedPhotoId: number) {
    this.memberService.detelePhoto(deletedPhotoId).subscribe({
      next: () => {
        if (this.member) {
          this.member.photos = this.member.photos.filter(
            (photo) => photo.id != deletedPhotoId
          );
        }
      },
    });
  }
}
