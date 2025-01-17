package com.society.server.model.entity.user;

import com.society.server.model.entity.*;
import com.society.server.utils.validators.EmailValidator;
import com.society.server.utils.validators.UserUsernameValidator;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
@NamedEntityGraph(name = "UserEntity.userPersonalInfo",
        attributeNodes = @NamedAttributeNode("userPersonalInfo"))
public class UserEntity extends BaseEntity {
    @UserUsernameValidator
    private String username;
    @NotNull()
    @Size(min = 6, max = 70, message = "Password must be at least 6 symbols.")
    private String password;
    @NotBlank()
    private String firstName;
    @NotBlank()
    private String lastName;
    @EmailValidator
    private String email;

    @Access(AccessType.PROPERTY)
    @Embedded()
    private UserPersonalInfo userPersonalInfo;

    @Builder.Default
    private boolean enabled = true;
    @Builder.Default
    private boolean locked = false;
    @Builder.Default
    private boolean accountExpired = false;
    @Builder.Default
    private boolean credentialsExpired = false;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "users_posts",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "post_id"))
    private List<PostEntity> userPosts = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "users_photos",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "photo_id"))
    private List<PhotoEntity> userPhotos = new ArrayList<>();

    @NotNull
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RoleEntity> roles;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_rooms",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id"))
    private Set<RoomEntity> rooms;

    public void addRoom(RoomEntity entity) {
        if (this.rooms.size() == 0) {
            this.rooms = new HashSet<>();
        }
        this.rooms.add(entity);
    }
}
