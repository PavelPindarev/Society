package com.society.server.model.entity;

import com.society.server.model.entity.user.UserEntity;
import com.society.server.model.enums.RoomEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
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
@Table(name = "rooms")
public class RoomEntity extends BaseEntity {

    @NotEmpty
    private String name;

    @NonNull
    @Enumerated(EnumType.STRING)
    private RoomEnum roomEnum;

    private String imageUrl;

    @NotEmpty
    @ManyToMany(fetch = FetchType.LAZY,
            mappedBy = "rooms", targetEntity = UserEntity.class)
    private Set<UserEntity> users;

    @OneToMany(fetch = FetchType.LAZY,
            mappedBy = "room", targetEntity = MessageEntity.class)
    private Set<MessageEntity> messages;

    public void addMessage(MessageEntity entity) {
        if (this.messages.size() == 0) {
            this.messages = new HashSet<>();
        }
        this.messages.add(entity);
    }

}
