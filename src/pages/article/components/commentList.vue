<template>
  <el-dialog
    title="评论列表"
    width="60%"
    ref="dialog"
    :model-value="dialogVisible"
    :before-close="handleClose"
  >
    <LoadingView :loading="loading">
      <el-table :data="commentList" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <el-table :data="props.row.comment_responses" style="width: 100%">
              <el-table-column label="楼层" prop="floorId"> </el-table-column>
              <el-table-column label="点赞" prop="likeCount"> </el-table-column>
              <el-table-column label="用户名称" prop="owner_user_nickname">
              </el-table-column>
              <el-table-column label="@用户名称" prop="target_user_nickname">
              </el-table-column>
              <el-table-column label="回复内容" prop="content">
                <template #default="scope">
                  <el-popover placement="bottom" width="40%" trigger="click">
                    <template #reference>
                      <span>点击查看</span>
                    </template>
                    <HtmlView :htmlView="scope.row.content" />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="创建时间" prop="createDate">
              </el-table-column>
              <el-table-column label="更新时间" prop="updateDate">
              </el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button
                    type="primary"
                    size="small"
                    icon="el-icon-edit-outline"
                    @click="handleEdit(scope.row._id)"
                    >回复</el-button
                  >
                  <el-button
                    type="danger"
                    size="small"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row._id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="id" prop="_id"> </el-table-column>
        <el-table-column label="楼层" prop="floorId"> </el-table-column>
        <el-table-column label="点赞" prop="likeCount"> </el-table-column>
        <el-table-column label="回复内容" prop="content">
          <template #default="scope">
            <el-popover placement="bottom" width="40%" trigger="click">
              <template #reference>
                <span>点击查看</span>
              </template>
              <HtmlView :htmlView="scope.row.content" />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createDate"> </el-table-column>
        <el-table-column label="更新时间" prop="updateDate"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit-outline"
              @click="handleEdit(scope.row._id)"
              >回复</el-button
            >
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="handleDelete(scope.row._id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </LoadingView>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, nextTick, ref, watch } from "vue";
import LoadingView from "@/components/loading.vue";
import { useAsyncRequest } from "@/hooks/useAsyncReq";
import HtmlView from "@/components/md-preview.vue";
export default defineComponent({
  name: "layout",
  components: {
    LoadingView,
    HtmlView,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      defalut: false,
    },
    pid: {
      type: String,
      defalut: "",
    },
  },
  setup(props, { emit }) {
    let loading = ref(true);
    let commentList = ref([]);
    watch(props, (oldVal, newVal) => {
      if (oldVal.dialogVisible) {
        useAsyncRequest({
          method: "get",
          url: `/v1/comment/${newVal.pid}`,
        })
          .then((res) => {
            console.log(res.data);
            commentList.value = res.data.data;
            nextTick();
          })
          .finally(() => {
            loading.value = false;
          });
      }
    });

    const handleClose = () => {
      emit("close");
    };

    return {
      handleClose,
      loading,
      commentList,
    };
  },
});
</script>