class Api::V1::MessagesController < ApplicationController
    def index
        if params[:channel]
            raw_messages = Message.where(channel: params[:channel])
        else
            raw_messages = Message.all
        end

        organized_messages = organize_messages(raw_messages)

        render json: organized_messages
    end

    private

    def organize_messages(raw_messages)
        parents = raw_messages.select { |message| message.thread_ts.nil? }
        children = raw_messages.select { |message| message.thread_ts.present? }

        organized_messages = parents.map do |parent|
            {
                id: parent.id,
                user: parent.user,
                ts: parent.ts,
                thread_ts: parent.thread_ts,
                text: parent.text,
                image_name: parent.image_name,
                image_url: parent.image_url,
                url: parent.url,
                channel: parent.channel,
                is_bot: parent.is_bot,
                created_at: parent.created_at,
                updated_at: parent.updated_at,
                children: children.select { |child| child.thread_ts == parent.ts }.map do |child|
                    {
                        id: child.id,
                        user: child.user,
                        ts: child.ts,
                        thread_ts: child.thread_ts,
                        text: child.text,
                        image_name: child.image_name,
                        image_url: child.image_url,
                        url: child.url,
                        channel: child.channel,
                        is_bot: child.is_bot,
                        created_at: child.created_at,
                        updated_at: child.updated_at
                    }
                end
            }
        end

        organized_messages
    end
end
